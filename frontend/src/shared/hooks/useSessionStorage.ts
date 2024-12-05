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

const safeDecode = (str: string): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (e) {
    console.error("Decoding error:", e);
    return "";
  }
};
const safeEncode = (str: string): string => {
  try {
    // UTF-8 문자열을 Base64로 안전하게 인코딩
    return btoa(encodeURIComponent(str));
  } catch (e) {
    console.error("Encoding error:", e);
    return "";
  }
};

function useSessionStorage() {
  // UTF-8 문자열을 Base64로 안전하게 인코딩하는 함수
  const safeEncode = (str: string): string => {
    try {
      // UTF-8 문자열을 Base64로 안전하게 인코딩
      return btoa(encodeURIComponent(str));
    } catch (e) {
      console.error("Encoding error:", e);
      return "";
    }
  };

  const setSessionItem = async (key: string, value: string) => {
    try {
      const data = {
        value,
        timestamp: new Date().getTime(),
        checksum: await generateChecksum(value),
      };
      const encodedData = safeEncode(JSON.stringify(data));
      sessionStorage.setItem(key, encodedData);
    } catch (error) {
      console.error("Error setting session item:", error);
    }
  };

  const getSessionItem = async (key: string) => {
    try {
      const encodedData = sessionStorage.getItem(key);
      if (!encodedData) return null;

      const decoded = JSON.parse(safeDecode(encodedData));
      const decodedChecksum = await generateChecksum(decoded.value);
      if (decodedChecksum !== decoded.checksum) {
        console.error("데이터 무결성 검증 실패");
        sessionStorage.removeItem(key);
        return null;
      }

      if (new Date().getTime() - decoded.timestamp > 1000 * 60 * 60) {
        console.error("세션이 만료되었습니다.");
        sessionStorage.removeItem(key);
        return null;
      }

      return decoded.value;
    } catch (error) {
      console.error("Error getting session item:", error);
      return null;
    }
  };

  return { setSessionItem, getSessionItem };
}

const getSessionItem = async (key: string) => {
  try {
    const encodedData = sessionStorage.getItem(key);
    if (!encodedData) return null;

    const decoded = JSON.parse(safeDecode(encodedData));
    const decodedChecksum = await generateChecksum(decoded.value);
    if (decodedChecksum !== decoded.checksum) {
      console.error("데이터 무결성 검증 실패");
      sessionStorage.removeItem(key);
      return null;
    }

    if (new Date().getTime() - decoded.timestamp > 1000 * 60 * 60) {
      console.error("세션이 만료되었습니다.");
      sessionStorage.removeItem(key);
      return null;
    }

    return decoded.value;
  } catch (error) {
    console.error("Error getting session item:", error);
    return null;
  }
};

const setSessionItem = async (key: string, value: string) => {
  try {
    const data = {
      value,
      timestamp: new Date().getTime(),
      checksum: await generateChecksum(value),
    };
    const encodedData = safeEncode(JSON.stringify(data));
    sessionStorage.setItem(key, encodedData);
  } catch (error) {
    console.error("Error setting session item:", error);
  }
};

export { useSessionStorage, getSessionItem, setSessionItem };
