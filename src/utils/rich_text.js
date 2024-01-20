import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

const RichText = ({
  document,
  locale,
  style,
  headingStyle,
  className = "",
}) => {
  return (
    <div className={`rich-blok ${className}`} style={style}>
      {render(document, {
        markResolvers: {
          link: (children, props) => {
            return <Link {...props}>{children}</Link>;
          },
        },
      })}
    </div>
  );
};

export default RichText;
