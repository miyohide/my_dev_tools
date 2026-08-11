import { transform, toolOptions, type ToolId } from "./tools";

declare const __APP_VERSION__: string;

function main(): void {
  const toolSelect = document.getElementById("tool-select") as HTMLSelectElement;
  const inputText = document.getElementById("input-text") as HTMLTextAreaElement;
  const outputText = document.getElementById("output-text") as HTMLTextAreaElement;
  const convertBtn = document.getElementById("convert-btn") as HTMLButtonElement;
  const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement;
  const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
  const optionArea = document.getElementById("option-area") as HTMLDivElement;
  const optionInput = document.getElementById("option-input") as HTMLInputElement;
  const optionLabel = document.getElementById("option-label") as HTMLLabelElement;

  function updateOptionVisibility(): void {
    const toolId = toolSelect.value as ToolId;
    const config = toolOptions[toolId];

    if (config.requiresOption) {
      optionArea.style.display = "block";
      optionLabel.textContent = config.optionLabel ?? "オプション:";
      optionInput.placeholder = config.optionPlaceholder ?? "";
    } else {
      optionArea.style.display = "none";
      optionInput.value = "";
    }

    // Update input placeholder based on tool
    if (toolId === "subnet-calc") {
      inputText.placeholder = "VPCのCIDRを入力（例: 10.0.0.0/16）";
    } else {
      inputText.placeholder = "ここにテキストを入力...";
    }
  }

  toolSelect.addEventListener("change", updateOptionVisibility);

  convertBtn.addEventListener("click", () => {
    const toolId = toolSelect.value as ToolId;
    const input = inputText.value;
    const option = optionInput.value;
    outputText.value = transform(toolId, input, option);
  });

  copyBtn.addEventListener("click", async () => {
    const text = outputText.value;
    if (text) {
      await navigator.clipboard.writeText(text);
    }
  });

  clearBtn.addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
    optionInput.value = "";
  });

  // Initialize option visibility
  updateOptionVisibility();

  // Display version
  const versionEl = document.getElementById("app-version");
  if (versionEl) {
    versionEl.textContent = `v${__APP_VERSION__}`;
  }
}

document.addEventListener("DOMContentLoaded", main);
