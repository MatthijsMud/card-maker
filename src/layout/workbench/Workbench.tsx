import { FC, ReactNode, useState, useCallback, memo, } from "react";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  styled,
  useMediaQuery,
} from "@mui/material";
import { 
  useTheme,
} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Based on the documentation from MUI detailing how to create a persistent sidebar.
// https://github.com/mui/material-ui/blob/fce921aec9e741aeb8e0dd5f9d754caff4072dfa/docs/data/material/components/drawers/PersistentDrawerLeft.tsx
const DisplacedContent = styled("main", { 
  shouldForwardProp: (prop) => prop !== "open" 
})<{ open?: boolean }>(({ theme, open }) => {
  return {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", { 
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }
});

const DisplacedAppbar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open?: boolean }>(({ theme, open }) => {
  return {
    transition: theme.transitions.create(["left", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: "0px",
    [theme.breakpoints.up("md")]: {
      ...(open && {
        left: "300px",
        transition: theme.transitions.create(["left", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      })
    }
  }
});

/**
 * The application bar's height is not accounted for in 
 * the layout by default.
 */
const Spacer = styled("div")(({ theme }) => {
  return {
    ...theme.mixins.toolbar as any,
  }
})

const SidebarHeader = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar as any,
    justifyContent: "flex-end",
  };
});

const SidebarContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open?: boolean }>(({ theme, open }) => {
  ;
  return {
    flexShrink: 0,
    width: 0,
    [theme.breakpoints.up("md")]: {
      width: open ? "300px" : 0,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })
    }),
  };
});

declare namespace Workbench {
  export type Props = {
    readonly sidebar?: ReactNode;
    readonly title?: ReactNode;
  }
}

const useSidebarState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    open,
    close,
  }
}

export const Workbench: FC<Workbench.Props> = memo((props) => {
  const { isOpen: fleeting, open: openFleeting, close: closeFleeting } = useSidebarState();
  const { isOpen: persistent, open: openPersistent, close: closePersistent } = useSidebarState();
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up("md"));

  return <Box sx={{ display: "flex", minHeight: "100vh" }}>
    <DisplacedAppbar open={persistent}>
      <Toolbar>
          {(wide && persistent) || 
            <IconButton 
              edge="start" 
              color="inherit"
              aria-label="Open menu"
              onClick={wide ? openPersistent : openFleeting}
            >
              <MenuIcon />
            </IconButton>}
        <div>
          {props.title}
        </div>
        
      </Toolbar>
    </DisplacedAppbar>
    <SidebarContainer open={persistent}>
      <SwipeableDrawer
        variant="temporary"
        open={fleeting && !wide}
        disableSwipeToOpen={wide }
        onOpen={openFleeting}
        onClose={closeFleeting}
        sx={{
          "& .MuiDrawer-paper": { width: "300px", boxSizing: "border-box" },
          
        }}
      >
        <nav>
          <SidebarHeader>
            <IconButton onClick={closeFleeting} aria-label="Close menu"><ChevronLeftIcon /></IconButton>
          </SidebarHeader>
          <Divider />
          {props.sidebar}
        </nav>
      </SwipeableDrawer>
      <Drawer 
        variant="persistent"
        open={persistent && wide}
        sx={{
          "& .MuiDrawer-paper": { width: "300px", boxSizing: "border-box" },
        }}
      >
        <nav>
          <SidebarHeader>
            <IconButton onClick={closePersistent} aria-label="Close menu"><ChevronLeftIcon /></IconButton>
          </SidebarHeader>
          <Divider />
          {props.sidebar}
        </nav>
      </Drawer>
    </SidebarContainer>

    <DisplacedContent open={persistent}>
      <Spacer />
      {props.children}
    </DisplacedContent>
  </Box>
});