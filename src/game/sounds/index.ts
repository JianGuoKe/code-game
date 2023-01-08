var soundsEnabled: boolean | null | string = null;
if (sessionStorage) {
  // Restore sounds state.
  soundsEnabled = sessionStorage.getItem("soundsEnabled");
  if (soundsEnabled === null) {
    soundsEnabled = true;
  } else {
    soundsEnabled = soundsEnabled === "true";
  }
} else {
  soundsEnabled = true;
}

export function getSoundsEnabled(): boolean {
  return soundsEnabled === true;
}

export function setSoundsEnabled(state: boolean) {
  if (sessionStorage) {
    sessionStorage.setItem("soundsEnabled", state.toString());
  }
}