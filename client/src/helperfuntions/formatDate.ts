export const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() +1;
    return`${day}/${month}`;
}