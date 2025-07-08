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


export const formatMessageTime = (date) =>{
  return new Date(date).toLocaleTimeString("es-ES",{
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}


export const summarizerText = async (text) => { // offer no es necesario aquí
  if ('Summarizer' in window) {
    try { // Añadir un bloque try-catch para manejar posibles errores en la API de Summarizer
      const summarizer = await Summarizer.create({
        type: 'teaser',
        length: 'short',
        format: 'plain-text',
      });
      const summary = await summarizer.summarize(text);
      return summary;
    } catch (error) {
      console.error("Error al resumir con la API de Chrome:", error);
      return text; // En caso de error, devuelve el texto original
    }
  } else {
    return text;
  }
};

export const summarizerTextTest = async () => {
  if ('Summarizer' in window) {
    try {
      const summarizer = await Summarizer.create({
        type: 'teaser',
        length: 'short',
        format: 'plain-text',
      });
      // Un resumen de prueba para activar la API
      await summarizer.summarize("This is a test to activate the summarizer API.");
      return { success: true };
    } catch (error) {
      console.error("Error activating Summarizer API:", error);
      if (error.name === "NotAllowedError") {
        return { success: false, errorType: "user_gesture_required" };
      }
      return { success: false, errorType: "other_error" };
    }
  } else {
    return { success: false, errorType: "api_not_available" };
  }
};