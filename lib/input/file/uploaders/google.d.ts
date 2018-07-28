export default function googleUploader({ bucket, accessId, serverUrl }: {
    bucket: any;
    accessId: any;
    serverUrl: any;
}, { maxKb, uploadIndex }: {
    maxKb: any;
    uploadIndex: any;
}, fileName: any): Promise<{
    url: string;
    data: {
        key: any;
        'Content-Disposition': string;
        GoogleAccessId: any;
        success_action_redirect: string;
        policy: any;
        signature: any;
    };
    fileId: string | null;
}>;
