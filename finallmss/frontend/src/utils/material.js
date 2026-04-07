export function resolveMaterialUrl(material) {
    return material.file || material.file_url || material.url || material.external_url || "";
}
export function toEmbeddedVideoUrl(rawUrl) {
    try {
        const url = new URL(rawUrl);
        if (url.hostname.includes("youtube.com")) {
            const videoId = url.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        if (url.hostname.includes("youtu.be")) {
            const videoId = url.pathname.replace("/", "");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        if (url.hostname.includes("vimeo.com")) {
            const videoId = url.pathname.replace("/", "");
            if (videoId) {
                return `https://player.vimeo.com/video/${videoId}`;
            }
        }
    }
    catch {
        return rawUrl;
    }
    return rawUrl;
}
export function groupMaterialsByType(materials) {
    return materials.reduce((acc, material) => {
        acc[material.type].push(material);
        return acc;
    }, {
        video: [],
        pdf: [],
        link: []
    });
}
