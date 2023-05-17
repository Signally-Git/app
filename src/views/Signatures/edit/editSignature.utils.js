export function extractValue(items, type, property) {
    return items?.filter(
        (style) => style.type === type && style.property === property
    )[0]?.value;
}

export function extractStyle(items, type) {
    return {
        fontWeight: items.filter(
            (style) => style.type === type && style.property === "fontWeight"
        )[0]?.value,
        fontStyle: items.filter(
            (style) => style.type === type && style.property === "fontStyle"
        )[0]?.value,
        textDecoration: items.filter(
            (style) =>
                style.type === type && style.property === "textDecoration"
        )[0]?.value,
    };
}
