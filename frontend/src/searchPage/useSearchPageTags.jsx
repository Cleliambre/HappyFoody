import React from "react";

// Hook pour gérer les tags d'une page
export default function useSearchPageTags(initialTags = []) {
    const [tags, setTags] = React.useState(initialTags);

    const addTag = (newTag) => {
        // Empêcher les doublons
        if (!tags.find((tag) => tag.name === newTag.name)) {
            setTags([...tags, newTag]);
        }
    };

    const deleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag.name !== tagToDelete.name));
    };

    // Réinitialiser les tags quand le composant est démonté
    React.useEffect(() => {
        return () => setTags([]);
    }, []);

    return { tags, addTag, deleteTag };
}