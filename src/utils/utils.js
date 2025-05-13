export const getDaysSince = (dateString) => {
    const createdAt = new Date(dateString);
    const today = new Date();
    const diffMs = today - createdAt;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  // const daysAgo = offer.createdAt ? getDaysSince(offer.createdAt) : 0;

  // <p className='flex items-center gap-3 '><MdOutlineAccessTime />Posted {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago</p>


  export const getInitials = (fullName) => {
    if (!fullName) return "NN"; // Nombre por defecto
    return fullName
      .split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  //<span>{getInitials(offer.owner?.name)}</span>

 export const capitalize = (str) => {
  return str
    ? str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
}
// const name = capitalize(owner?.name || '');
// const surname = capitalize(owner?.surname || '');
// const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';