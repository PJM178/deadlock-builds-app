import { render, screen } from '@testing-library/react';
import { expect } from "vitest";
import Popover from './Popover';

describe("Popover Component", () => {
  test('renders when open', () => {
    const testElement = <div>this should render</div>;
  
    render(<Popover isOpen={true} anchorEl={null} position="center">
      {testElement}
    </Popover>);
  
    // Select popover using test ID
    const popover = screen.getByTestId("popover");
    expect(popover).toBeInTheDocument();

    // Select the content inside the popover
    const content = screen.getByText("this should render");
    expect(content).toBeInTheDocument();
  });
  
  test('does not render when closed', () => {
    const testElement = <div>this should not render</div>;
  
    render(<Popover isOpen={false} anchorEl={null} position="center">
      {testElement}
    </Popover>);
  
    // Since popover is closed, it should not be in the document
    expect(screen.queryByTestId("popover")).toBeNull();
    expect(screen.queryByText("this should not render")).toBeNull();
  });
});
