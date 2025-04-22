import bcrypt from 'bcrypt';

export const hashPassword=async(password)=>{
  try {
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(password,saltRounds);
    return hashPassword
  } catch (error) {
    new Error(error)
  }
}

export const comparePassword=async(password,hashPassword)=>{
  try {
    return await bcrypt.compare(password,hashPassword);
  } catch (error) {
    console.log(error)
  }
}
