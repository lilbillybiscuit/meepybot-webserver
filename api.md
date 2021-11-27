# API Specifications

**Get pin list**

    {
        "date": integer,
        "success": boolean,
        "error": string,
        "size": integer,
        "channel_name": string,
        "elements": {
            {
                "index" : integer,
                "timestamp": string,
                "username": string,
                "username_color": string,
                "avatar_url": string,
                "message_url": string,
                "attachments": boolean,
                "attachments_api": string, 
                "message": huge string, message is already html
                
            }
        }
    }