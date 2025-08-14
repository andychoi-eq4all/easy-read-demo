import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-8">
        <p>© {currentYear} EQ4ALL. All rights reserved.</p>
        <div className="flex justify-center mt-3 space-x-4">
          {/* <a href="#" className="hover:text-primary transition-colors">
            이용약관
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            도움말
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
