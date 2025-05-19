import * as React from "react"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, external = false, ...props }, ref) => {

    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

    return (
      <a
        ref={ref}
        {...externalProps}
        {...props}
      >
        {children}
      </a>
    )
  }
)
Link.displayName = "Link"

export { Link }
