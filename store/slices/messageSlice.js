const messageSlice = (set) =>({
    messages: [{payload:{message:'test'}}],
    currentMessage : '',
    setCurrentMessage:(value) => set(()=> ({currentMessage:value})),
    addMessage: (message) => set((state) => ({ messages : [...state.messages,message] })),
})

export default messageSlice