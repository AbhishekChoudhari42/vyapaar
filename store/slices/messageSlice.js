const messageSlice = (set) =>({
    messages: [],
    currentMessage : '',
    setCurrentMessage:(value) => set(()=> ({currentMessage:value})),
    setMessages: (currentMessage) => set((state) => ({ messages : [...state.messages, currentMessage] })),
})

export default messageSlice