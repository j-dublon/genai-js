import "@react-component-library/ui/ui.css";
import "../globals.css";

const JoinFlowLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}`;

  return (
    <div className="join-flow-container">
      <style>{`
        :root {
        --font-url-garnett-regular: "${baseUrl}/vc-ap-marketing/fonts/Garnett-Regular.woff2";
        --font-url-garnett-semibold: "${baseUrl}/vc-ap-marketing/fonts/Garnett-SemiBold.woff2";
        }
      `}</style>
      <div className="font-garnett">{children}</div>
    </div>
  );
};

export default JoinFlowLayout;
