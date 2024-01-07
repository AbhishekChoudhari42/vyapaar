export const messageSlice = (set) =>({
    messages: ['test1','test2'],
    currentMessage : '',
    setCurrentMessage:(value) => set(()=> ({currentMessage:value})),
    addMessage: (message) => set((state) => ({ messages : [...state.messages,message] })),
})