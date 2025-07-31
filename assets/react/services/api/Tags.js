export function searchTags (
    searchText = ""
)
{
    const tags = [
        {id: 1, title: "PHP", colorCode: "4d73e1"},
        {id: 2, title: "Javascript", colorCode: "f8f407"}
    ];

    if (searchText === "") {
        return [];
    }

    return tags.filter(tag =>
        tag.title && tag.title.toLowerCase().includes(searchText.toLowerCase())
    );
}