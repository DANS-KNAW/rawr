import { ComboBoxDataItem } from "./types/inputs-types";

chrome.action.onClicked.addListener(async (tab) => {
  // Check if the current tab ID is undefined
  if (tab.id === undefined) {
    return;
  }

  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";

  // Try to send a message to the content script to check if it is already injected
  try {
    await chrome.tabs.sendMessage(tab.id, { action: "check" });

    // If the content script responds, toggle the visibility
    chrome.tabs.sendMessage(tab.id, { action: nextState });
  } catch (error) {
    // If sending the message fails, inject the content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"],
    });
    // After injection, send a message to toggle the visibility
    chrome.tabs.sendMessage(tab.id, { action: nextState });
  }

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
});

// Storage API to manage config
export interface Config {
  seenActiveDevelopmentWarning: boolean;
  skipWelcome: boolean;
  vocabularies: {
    pathways: boolean;
    working_groups: boolean;
    interest_groups: boolean;
    gorc_elements: boolean;
    gorc_attributes: boolean;
    domains: boolean;
  };
  rememberAnnotationChoices: boolean;
  choices: Record<string, ComboBoxDataItem[]>;
  keywords: ComboBoxDataItem[];
}

const defaultConfig = {
  seenActiveDevelopmentWarning: false,
  vocabularies: {
    pathways: true,
    working_groups: true,
    interest_groups: true,
    gorc_elements: true,
    gorc_attributes: true,
    domains: true,
  },
};

// Set the default configuration only on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("config", (result) => {
    if (!result.config) {
      chrome.storage.local.set({ config: defaultConfig }, () => {
        console.log("Default configuration has been set.");
      });
    } else {
      console.log("Configuration already exists.");
    }
  });
});
