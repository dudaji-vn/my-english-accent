export interface IQueryListen {
  userId: string
  category: string
  type: 'Verb' | 'Noun' | 'Place / Time'
  sortBy: 'latestFile' | 'completedRecently'
  groupId?: string
}

export interface IQueryAudio {
  groupId?: string
  recordId: string
  userId?: string
  me?: string
  vocabularyId?: string
}
