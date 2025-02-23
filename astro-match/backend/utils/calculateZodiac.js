const calculateZodiac = (birthDate) => {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) return "Naməlum";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Qoç";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Buğa";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Əkizlər";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Xərçəng";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Şir";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Qız";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Tərəzi";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Əqrəb";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Oxatan";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Oğlaq";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Dolça";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Balıqlar";
  
    return "Naməlum";
  };
  module.exports = calculateZodiac;