function calculateZodiac(birthDate) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
  
 
    const zodiacSigns = [
      { sign: "Oğlaq", endMonth: 1, endDay: 19 },
      { sign: "Dolça", endMonth: 2, endDay: 18 },
      { sign: "Balıq", endMonth: 3, endDay: 20 },
      { sign: "Qoç", endMonth: 4, endDay: 19 },
      { sign: "Buğa", endMonth: 5, endDay: 20 },
      { sign: "Əkizlər", endMonth: 6, endDay: 20 },
      { sign: "Xərçəng", endMonth: 7, endDay: 22 },
      { sign: "Şir", endMonth: 8, endDay: 22 },
      { sign: "Qız", endMonth: 9, endDay: 22 },
      { sign: "Tərəzi", endMonth: 10, endDay: 22 },
      { sign: "Əqrəb", endMonth: 11, endDay: 21 },
      { sign: "Oxatan", endMonth: 12, endDay: 21 },
    ];
  
   
    for (let i = 0; i < zodiacSigns.length; i++) {
      const { sign, endMonth, endDay } = zodiacSigns[i];
      if (month === endMonth && day <= endDay) {
        return sign;
      }
      if (month < endMonth || (month === endMonth && day > endDay)) {
        return zodiacSigns[(i + 1) % zodiacSigns.length].sign;
      }
    }
    return "Bilinməyən Bürc"; 
  }
  
module.exports=calculateZodiac;
  