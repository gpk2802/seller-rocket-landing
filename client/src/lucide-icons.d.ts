declare module "lucide-react/dist/esm/icons/*.js" {
  import type * as React from "react";

  const Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  export default Icon;
}

