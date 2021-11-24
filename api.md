# API Specifications

**Get pin list**

    {
        "date": integer,
        "size": integer,
        "channel_name": string,
        "elements": {
            {
                "index" : integer,
                "username": long integer,
                "username_color": string,
                "avater_url": string,
                "message_url": string,
                "attachments": boolean,
                "message": possibly huge string,
                
            }
        }
    }