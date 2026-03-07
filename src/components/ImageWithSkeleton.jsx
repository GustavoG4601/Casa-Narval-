import { useState } from 'react';

/**
 * A component that displays a skeleton screen while an image is loading.
 * @param {string} src - The image source URL.
 * @param {string} alt - Alt text for the image.
 * @param {string} className - CSS class for the image.
 * @param {object} containerStyle - Style for the container.
 * @param {string} containerClass - CSS class for the container.
 * @param {string} skeletonClass - CSS class for the skeleton.
 */
export default function ImageWithSkeleton({
    src,
    alt,
    className = "",
    containerStyle = {},
    containerClass = "",
    skeletonClass = "skeleton"
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`position-relative overflow-hidden ${containerClass}`}
            style={{ ...containerStyle }}
        >
            {!loaded && (
                <div
                    className={`position-absolute top-0 start-0 w-100 h-100 ${skeletonClass}`}
                    style={{ zIndex: 1 }}
                />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s ease-in-out' }}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
