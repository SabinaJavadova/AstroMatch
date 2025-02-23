const User = require("../models/user");

const getUserMatches = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }

    const zodiacMatches = {
      "Qoç": ["Şir", "Oxatan", "Əkizlər", "Tərəzi"],
      "Buğa": ["Xərçəng", "Oğlaq", "Qız"],
      "Əkizlər": ["Tərəzi", "Dolça", "Qoç", "Balıqlar"],
      "Xərçəng": ["Buğa", "Oğlaq", "Balıqlar", "Şir"],
      "Şir": ["Qoç", "Əkizlər", "Tərəzi", "Oxatan"],
      "Qız": ["Buğa", "Oğlaq", "Xərçəng", "Balıqlar"],
      "Tərəzi": ["Əkizlər", "Şir", "Dolça", "Qoç"],
      "Əqrəb": ["Balıqlar", "Xərçəng", "Oğlaq"],
      "Oxatan": ["Qoç", "Şir", "Əkizlər", "Dolça"],
      "Oğlaq": ["Buğa", "Xərçəng", "Qız", "Əqrəb"],
      "Dolça": ["Əkizlər", "Tərəzi", "Oxatan", "Balıqlar"],
      "Balıqlar": ["Xərçəng", "Buğa", "Əqrəb", "Əkizlər"]
    };

    const compatibleSigns = zodiacMatches[user.zodiacSign] || [];

    const matches = await User.find({
      zodiacSign: { $in: compatibleSigns },
      _id: { $ne: user._id }
    });

    res.json({ user, matches });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};

module.exports = { getUserMatches };
