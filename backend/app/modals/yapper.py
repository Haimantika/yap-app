from pydantic import BaseModel

class YapRequest(BaseModel):
    text_str: str

class YapResponse(BaseModel):
    message: str
