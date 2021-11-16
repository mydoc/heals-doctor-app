export interface IMedicalCertificate {
    id: number,
    episodeId: number,
    doctorId: number,
    patientId: number,
    groupId: number,
    reason: string,
    issueDate: Date,
    startDate: Date,
    endDate: Date
}
