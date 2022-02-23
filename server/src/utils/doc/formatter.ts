export const formatString = (data: any): string => {
    if (data) {
      return data;
    } else {
      return " - ";
    }
  };
 export  const formatBoolean = (data: any): string => {
    if (data !== null) {
      return data ? "Yes" : "No";
    } else {
      return " - ";
    }
  };
  
 export  const formatNum = (data: any): string => {
    if (data !== null) {
      return data.toString();
    } else {
      return " - ";
    }
  };

  export const formatDate = (data: any): string => {
    if(data !== null){
      try{
        const date = new Date(data);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      }catch(e){
        return " - "
      }
    }else{
      return " - ";
    }
  }