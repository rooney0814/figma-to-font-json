interface TextInfo {
  textCase: string;
  fontName: {
    family: string;
    style: string;
  }
  fontWeight: number;
  fontSize: number;
  lineHeight?: {
    unit?: string;
    value?: number;
  }
}

export const textParser = (json: any): any[] => {
  // Set 대신 객체를 사용하여 중복 제거
  const uniqueNodes = new Map<string, any>();

  const findTextNodes = (node: any) => {
    if (node.type === "TEXT") {
      const textInfo = {
        textCase: node.textCase,
        fontName: node.fontName,
        fontWeight: node.fontWeight,
        fontSize: node.fontSize,
        lineHeight: node.lineHeight,
      };
      // 객체를 문자열로 변환하여 키로 사용
      const key = JSON.stringify(textInfo);
      uniqueNodes.set(key, textInfo);
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => findTextNodes(child));
    }
  };

  findTextNodes(json);
  // Map의 값들만 배열로 변환하여 반환
  return Array.from(uniqueNodes.values()).sort((a, b) => {
    // First compare by family name
    const familyComparison = a.fontName.family.localeCompare(b.fontName.family);
    if (familyComparison !== 0) return familyComparison;
    
    // If family names are same, compare by style
    const styleComparison = a.fontName.style.localeCompare(b.fontName.style);
    if (styleComparison !== 0) return styleComparison;
    
    // If styles are same, compare by fontSize
    const sizeComparison = a.fontSize - b.fontSize;
    if (sizeComparison !== 0) return sizeComparison;
    
    // If fontSize is same, compare by fontWeight
    return a.fontWeight - b.fontWeight;
  });
}