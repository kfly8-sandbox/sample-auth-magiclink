import type { ComponentType, FC } from 'react';

type IslandOptions = {
  basename?: string;
}

/**
 * Create an island component for server-side rendering.
 */
export function $island<P extends object>(
  Component: ComponentType<P>,
  options: IslandOptions = {},
): FC<P> {
  const componentName = Component.displayName || Component.name;
  const basename = options.basename || componentName;

  const IslandComponent: FC<P> = (props) => {
    return (
      <div
        data-app-hydrated="false"
        data-app-component={componentName}
        data-app-props={JSON.stringify(props)}
        data-app-basename={basename}
      >
        <Component {...props} />
      </div>
    );
  };

  // Mark `$` to the island component
  IslandComponent.displayName = `$${componentName}`;

  return IslandComponent;
}
