const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
export const textFormatter = (data) => {
  if (data === undefined || data === null) return "-";
  return data
};

export const dateFormatter = (date) => {
  if(date === undefined) return "-";
  date = new Date(date)
  
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const jobDateFormatter = (jobDates) => {
  const res = Object();
  for(let jobDate of jobDates){
    const date = new Date(jobDate.date);
   
    if(res[ monthNames[date.getMonth()]] === undefined){
      res[monthNames[date.getMonth()]] = Array();
    }
    res[monthNames[date.getMonth()]].push({...jobDate, date})
  }

  return res;

}

export const datetimeFormatter = (date) => {
  if(date === undefined) return "-";
  date = new Date(date)
  
  return `${date.getHours() < 10  ? "0" + date.getHours() : date.getHours()}:${date.getUTCMinutes() < 10 ? "0"+  date.getUTCMinutes() : date.getUTCMinutes()} ${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const htmlDateFormatter = (date) => {
  if(date === undefined) return "-";
  date = new Date(date)
  return `${date.getFullYear()}-${
    (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) :  (date.getMonth()+1)
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};

export const htmlDateTimeFormatter = (date) => {
  if(date === undefined) return "";
  date = new Date(date)
  return date.getFullYear()+ "-" +
   ( date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "T" + 
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":"+ (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes());
};
