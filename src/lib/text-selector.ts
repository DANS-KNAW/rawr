export default class TextSelectionHandler {
  private handleSelectionChange: () => void;

  constructor(
    private onSelectionChangeCallback: (selectedText: string | null) => void
  ) {
    this.handleSelectionChange = this.onSelectionChange.bind(this);
    document.addEventListener("selectionchange", this.handleSelectionChange);
  }

  private getSelectedText(): string | null {
    const selection = document.getSelection();
    const text = selection ? selection.toString() : null;
    if (typeof text === "string" && text.trim() === "") {
      return null;
    }
    return text;
  }

  private onSelectionChange(): void {
    const selectedText = this.getSelectedText();
    this.onSelectionChangeCallback(selectedText);
  }

  public cleanup(): void {
    document.removeEventListener("selectionchange", this.handleSelectionChange);
  }
}
