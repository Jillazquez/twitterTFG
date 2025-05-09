function checkRhyme(req, res, next) {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "El contenido del post es obligatorio." });
    }
  
    const lines = content.split("\n").filter((line) => line.trim() !== "");
  
    if (lines.length < 2) {
      return res.status(400).json({ error: "El post debe contener al menos dos versos para verificar la rima." });
    }
  
    const getEnding = (word) => word.slice(-2).toLowerCase();
  
    const endings = lines.map((line) => {
      const words = line.trim().split(" ");
      const lastWord = words[words.length - 1];
      return getEnding(lastWord);
    });
  
    const allRhyme = endings.every((ending) => ending === endings[0]);
  
    if (!allRhyme) {
      return res.status(400).json({ error: "El post no rima." });
    }
  
    next();
  }
  
  module.exports = checkRhyme;
