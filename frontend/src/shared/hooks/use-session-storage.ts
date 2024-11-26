async function generateChecksum<T>(data: T): Promise<string> {
  const stringData = JSON.stringify(data);
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(stringData);

  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

function useSessionStorage() {
  const setSessionItem = (key: string, value: string) => {
    const encryptData = btoa(
      JSON.stringify({
        value,
        timestamp: new Date().getTime(),
        checksum: generateChecksum(value),
      }),
    );
    sessionStorage.setItem(key, encryptData);
  };

  const getSessionItem = (key: string) => {
    const encryptData = sessionStorage.getItem(key);
    if (!encryptData) return null;

    try {
      const decoded = JSON.parse(atob(encryptData));

      if (generateChecksum(decoded.value) !== decoded.checksum) {
        console.error("강제로 변경된 데이터가 있습니다.");
        sessionStorage.removeItem(key);
        return null;
      }

      if (new Date().getTime() - decoded.timestamp > 1000 * 60 * 60) {
        console.error("세션이 만료되었습니다.");
        sessionStorage.removeItem(key);
        return null;
      }

      return decoded.value;
    } catch {
      return null;
    }
  };

  return { setSessionItem, getSessionItem };
}

export { useSessionStorage };
