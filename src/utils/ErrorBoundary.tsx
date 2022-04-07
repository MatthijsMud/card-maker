import { FC, Component } from "react";

/**
 * Wrapper component that prevents errors in its child components from propagating furhter
 * up the tree. A fallback component can be provided to show a meaningful error message.
 */
export class ErrorBoundary extends Component<ErrorBoundary.Props, ErrorBoundary.State>
{

  public constructor(props: ErrorBoundary.Props)
  {
    super(props);
    this.state = {
      error: undefined
    };

    // Binding is required to make sure callback use the correct
    // value for "this".
    this.reset = this.reset.bind(this);
  }

  private reset()
  {
    this.setState({
      error: undefined
    });
  }

  public componentDidCatch(error: unknown) 
  {
    this.props.onError?.(error);
  }

  public render()
  {
    const { 
      error 
    } = this.state;

    const {
      // Start the name of a custom component with
      // a capital, as per convention.
      fallback: Fallback,
      children
    } = this.props;

    return error
    // Only render the Fallback if it is actually provided. If it fails to render,
    // all components get unmounted until the next error boundary is encountered.
    // A Fallback ideally does not fail though.
    ? (Fallback ? <Fallback error={error} reset={this.reset} /> : null)
    // Returning nothing (also known as `undefined`) implies the render failed,
    // `null` on the other hand means that there is nothing to render. Make sure
    // that this component does not fail if no children have been provided.
    : typeof children === "undefined" ? null : children;
  }

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundary.State> {
    return { error };
  }
}

export declare namespace ErrorBoundary {
  export type State = {
    /**
     * Latest "error" that has been encountered while rendering the child components.
     */
    readonly error?: unknown;
  }

  export type FallbackProps = {
    /**
     * Error that was encountered by the `<ErrorBoundary />` while trying to render
     * its `children`. Could be used to show a somewhat meaningful error message for example.
     */
    readonly error: unknown;
    /**
     * Causes the `<ErrorBoundary />` to retry rendering its `children`.
     * 
     * External state changes might have an effect on the `children` provided to the `<ErrorBoundary />`,
     * and could thus cause them to render successfully after they have failed prior. Invoke this 
     * method after such a state change has occurred to retry rendering the component.
     */
    reset(): void;
  }

  export type Props = {
    readonly fallback?: FC<FallbackProps>;
    /**
     * Optional callback that gets invoked when an error is
     * caught while trying to render children.
     * @param error Error that has been encountered. Note: this
     * can be anything.
     */
    onError?(error: unknown): void;
  }
}