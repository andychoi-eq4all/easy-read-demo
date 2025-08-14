import React from "react";
import { SimplificationProvider } from "../contexts/SimplificationContext";

const TestPage: React.FC = () => {
  return (
    <div>
      <h1>Context Test Page</h1>
      <p>This page tests that the SimplificationProvider context is working correctly.</p>
    </div>
  );
};

export default TestPage;