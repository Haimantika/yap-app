from fastapi import APIRouter, Depends, HTTPException
from app.services.groq_service import GroqService
from app.modals.yapper import YapRequest, YapResponse
router = APIRouter()

@router.post("/generate_yap", response_model=YapResponse)
async def generate_yap(request: YapRequest, groq_service: GroqService = Depends()):
    try:
        response_data = await groq_service.generate_yap(request.text_str)
        return YapResponse(**response_data)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
