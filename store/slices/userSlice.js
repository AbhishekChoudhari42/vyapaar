const userSlice = (set) =>({
    user:null,
    setUser:(value) => set(()=> ({user:value})),
})
export default userSlice