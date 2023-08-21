import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import ExternalDataComponent from './index';

describe("Live Data Component", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    const image_alt_text = "Hero GameBox"
    const image = "https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHeroGameBox.png"
    render(<ExternalDataComponent img_alt={image_alt_text} id={"33333"} image={image}/>);

    const backgroundImageElement = screen.getByLabelText(image_alt_text + " Component Image");
    expect(backgroundImageElement).toBeInTheDocument();

    const styles = window.getComputedStyle(backgroundImageElement);

    expect(styles.backgroundImage).toBe(`url(${image})`);
  });

  test('renders component with diffrent default data', () => {
    const image_alt_text = "Hero Event"
    const image = "https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHeroEvent.png"
    render(<ExternalDataComponent img_alt={image_alt_text} id={"4444"} image={image}/>);

    const backgroundImageElement = screen.getByLabelText(image_alt_text + " Component Image");
    expect(backgroundImageElement).toBeInTheDocument();

    const styles = window.getComputedStyle(backgroundImageElement);

    expect(styles.backgroundImage).toBe(`url(${image})`);
  });

});