import React, { useRef } from "react";
import { observer, inject } from "mobx-react";
import {useRouter} from 'next/router'
import { Button,Box,Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import ReserveCard from '../components/reserveCard';
import SampleDoc from '../components/dayOffDoc';
import ReactToPrint from "react-to-print";


export default function defaultApp(){
  const router = useRouter();
  //더미 데이터
  let data = {
    "data": [
        {
            "PK": 23,
            "thumb": "aM6F3lOsKUwHA5NCkusfmH2ilNupcgskh34SiNuf.jpg",
            "title": "[강남] 링",
            "description": "내 조카 유키는 자살할 아이가 아닌데...\r\n\r\n\r\n\r\n\r\n\r\n\r\n※ 링은 3인 이상 가능한 테마입니다.",
            "weekendPK": null,
            "rating": 4.7
        },
        {
            "PK": 25,
            "thumb": "53YBaDeUELhwD5rla4FGnJxlARAXRbS3WllubGm3.jpg",
            "title": "[강남] 나비효과",
            "description": "다시 그 때로 돌아갈 수만 있다면 얼마나 좋을까..?",
            "weekendPK": null,
            "rating": 3.1
        },
        {
            "PK": 27,
            "thumb": "jsU0eVFchFzKRGTR7k63ia6eVUFviJ2mdFmEt932.jpg",
            "title": "[강남] 콜러",
            "description": "나는 기억을 잃었다.",
            "weekendPK": null,
            "rating": 4.2
        },
        {
            "PK": 29,
            "thumb": "zrRSFfvNxvemwSoeAVnIGe9UCUQ5sZwYLcI9Dbki.jpg",
            "title": "[강남] 어느겨울밤2",
            "description": "나는 열 살 클라라에요.\r\n\r\n크리스마스가 다가오는 지금 나는 매일 밤 왕자님 인형을\r\n갖게 해 달라고 기도하면서 잠들어요.\r\n그런데, 벌써 다섯 밤 째 자꾸 무서운 꿈을 꿔요..\r\n막 덩치 큰 쥐들이 찍찍거리면서 방을 돌아다니고\r\n만지지도 않은 장난감들이 마음대로 삐그덕 거리고…\r\n오늘도 그 꿈을 꾸면 어떡하죠…?",
            "weekendPK": null,
            "rating": 3.7
        },
        {
            "PK": 31,
            "thumb": "XrztwnZ9ApcLWcAHwcSoHbFqa4cl6EJH1Bl2jreF.jpg",
            "title": "[강남] 아이엠",
            "description": "내 이름은 에론 머스크. 어릴 때부터 내꿈은 슈퍼 히어로였다.\r\n\r\n용감하게 범죄에 맞서 위험한 사람들을 구하고,\r\n가정을 꾸려 내 가족의 행복을 지키는 히어로!\r\n그 꿈을 키워 지금의 나는 모두가 인정하는 경찰이 되었고,\r\n현재는 연쇄 살인사건의 범인 L을 수사 중에 있다. 살인마 L ...",
            "weekendPK": null,
            "rating": 4.3
        },
        {
            "PK": 37,
            "thumb": "X51oi3HLesowsNm1mxmFk6nQeIwZXa4e5QC23Fe1.jpg",
            "title": "[강남] 제로호텔L",
            "description": "나는 국민여배우 톱스타 홍설아와 비밀 연애중이다.\r\n\r\n\r\n\r\n\r\n[제로호텔 김포], [제로호텔L 강남] 두 지점 중 한 지점 체험한 경우 50%할인 \r\n※회원카드/신분증 지참시 가능         ※현금 할인 외 다른 할인과 중복 할인 불가",
            "weekendPK": null
        },
        {
            "PK": 41,
            "thumb": "h77RkOOKRX3XTVttuI7KPApcV2sSlFORaTTFlm60.jpg",
            "title": "[강남] DONE",
            "description": "난이도: ★★★☆☆+a\r\n\r\n우리는 런던 뒷골목을 누비는 Alex 형제들. \r\n우연히 찰리 전파사에 굉장히 큰 돈이 숨겨져 있다는 \r\n소문을 들었다.\r\n오늘은 전파사의 휴무일. \r\n털자!",
            "weekendPK": null
        },
        {
            "PK": 43,
            "thumb": "AVISPw8N2JfMThKvnk3VJzeY9qywIaYd8pTy46Xx.jpg",
            "title": "[강남] 포레스트 (FORREST)",
            "description": "공포지수: 4.5\r\n\r\n\r\n'Show dawn' 초대장이 도착했습니다.\r\n\r\n<총 상금 50억의 호러퀴즈쇼 'Show dawn'>\r\n당신은 이겨낼 수 있습니까?",
            "weekendPK": null
        },
        {
            "PK": 45,
            "thumb": "vvKmmbiIvO6wfAOF7NgkSLbf8Rmzn9LqYgiHkqMH.jpg",
            "title": "[강남] 헐!",
            "description": "뭐지? 끼이이익----!\r\n처음 듣는 날카로운 소리와 함께\r\n내 몸은 하늘로 붕 뜬다...",
            "weekendPK": null
        }
    ],
    "times": {
        "43": [
            {
                "themePK": 43,
                "time": "10:15:00",
                "reservation": true,
                "timeKO": "10시 15분"
            },
            {
                "themePK": 43,
                "time": "11:50:00",
                "reservation": true,
                "timeKO": "11시 50분"
            },
            {
                "themePK": 43,
                "time": "13:25:00",
                "reservation": true,
                "timeKO": "13시 25분"
            },
            {
                "themePK": 43,
                "time": "15:00:00",
                "reservation": true,
                "timeKO": "15시 00분"
            },
            {
                "themePK": 43,
                "time": "16:35:00",
                "reservation": true,
                "timeKO": "16시 35분"
            },
            {
                "themePK": 43,
                "time": "18:10:00",
                "reservation": true,
                "timeKO": "18시 10분"
            },
            {
                "themePK": 43,
                "time": "19:45:00",
                "reservation": true,
                "timeKO": "19시 45분"
            },
            {
                "themePK": 43,
                "time": "21:20:00",
                "reservation": true,
                "timeKO": "21시 20분"
            }
        ],
        "23": [
            {
                "themePK": 23,
                "time": "10:20:00",
                "reservation": true,
                "timeKO": "10시 20분"
            },
            {
                "themePK": 23,
                "time": "11:50:00",
                "reservation": true,
                "timeKO": "11시 50분"
            },
            {
                "themePK": 23,
                "time": "13:20:00",
                "reservation": true,
                "timeKO": "13시 20분"
            },
            {
                "themePK": 23,
                "time": "14:50:00",
                "reservation": true,
                "timeKO": "14시 50분"
            },
            {
                "themePK": 23,
                "time": "16:20:00",
                "reservation": true,
                "timeKO": "16시 20분"
            },
            {
                "themePK": 23,
                "time": "17:50:00",
                "reservation": true,
                "timeKO": "17시 50분"
            },
            {
                "themePK": 23,
                "time": "19:20:00",
                "reservation": true,
                "timeKO": "19시 20분"
            },
            {
                "themePK": 23,
                "time": "20:50:00",
                "reservation": true,
                "timeKO": "20시 50분"
            }
        ],
        "25": [
            {
                "themePK": 25,
                "time": "10:30:00",
                "reservation": false,
                "timeKO": "10시 30분"
            },
            {
                "themePK": 25,
                "time": "12:00:00",
                "reservation": false,
                "timeKO": "12시 00분"
            },
            {
                "themePK": 25,
                "time": "13:30:00",
                "reservation": false,
                "timeKO": "13시 30분"
            },
            {
                "themePK": 25,
                "time": "15:00:00",
                "reservation": true,
                "timeKO": "15시 00분"
            },
            {
                "themePK": 25,
                "time": "16:30:00",
                "reservation": false,
                "timeKO": "16시 30분"
            },
            {
                "themePK": 25,
                "time": "18:00:00",
                "reservation": false,
                "timeKO": "18시 00분"
            },
            {
                "themePK": 25,
                "time": "19:30:00",
                "reservation": false,
                "timeKO": "19시 30분"
            },
            {
                "themePK": 25,
                "time": "21:00:00",
                "reservation": false,
                "timeKO": "21시 00분"
            }
        ],
        "45": [
            {
                "themePK": 45,
                "time": "10:35:00",
                "reservation": false,
                "timeKO": "10시 35분"
            },
            {
                "themePK": 45,
                "time": "11:55:00",
                "reservation": true,
                "timeKO": "11시 55분"
            },
            {
                "themePK": 45,
                "time": "13:15:00",
                "reservation": true,
                "timeKO": "13시 15분"
            },
            {
                "themePK": 45,
                "time": "14:35:00",
                "reservation": true,
                "timeKO": "14시 35분"
            },
            {
                "themePK": 45,
                "time": "15:55:00",
                "reservation": true,
                "timeKO": "15시 55분"
            },
            {
                "themePK": 45,
                "time": "17:15:00",
                "reservation": true,
                "timeKO": "17시 15분"
            },
            {
                "themePK": 45,
                "time": "18:35:00",
                "reservation": true,
                "timeKO": "18시 35분"
            },
            {
                "themePK": 45,
                "time": "19:55:00",
                "reservation": false,
                "timeKO": "19시 55분"
            },
            {
                "themePK": 45,
                "time": "21:15:00",
                "reservation": false,
                "timeKO": "21시 15분"
            }
        ],
        "27": [
            {
                "themePK": 27,
                "time": "10:40:00",
                "reservation": true,
                "timeKO": "10시 40분"
            },
            {
                "themePK": 27,
                "time": "12:10:00",
                "reservation": true,
                "timeKO": "12시 10분"
            },
            {
                "themePK": 27,
                "time": "13:40:00",
                "reservation": true,
                "timeKO": "13시 40분"
            },
            {
                "themePK": 27,
                "time": "15:10:00",
                "reservation": true,
                "timeKO": "15시 10분"
            },
            {
                "themePK": 27,
                "time": "16:40:00",
                "reservation": true,
                "timeKO": "16시 40분"
            },
            {
                "themePK": 27,
                "time": "18:10:00",
                "reservation": true,
                "timeKO": "18시 10분"
            },
            {
                "themePK": 27,
                "time": "19:40:00",
                "reservation": true,
                "timeKO": "19시 40분"
            },
            {
                "themePK": 27,
                "time": "21:10:00",
                "reservation": true,
                "timeKO": "21시 10분"
            }
        ],
        "41": [
            {
                "themePK": 41,
                "time": "11:00:00",
                "reservation": true,
                "timeKO": "11시 00분"
            },
            {
                "themePK": 41,
                "time": "12:40:00",
                "reservation": true,
                "timeKO": "12시 40분"
            },
            {
                "themePK": 41,
                "time": "14:20:00",
                "reservation": true,
                "timeKO": "14시 20분"
            },
            {
                "themePK": 41,
                "time": "16:00:00",
                "reservation": true,
                "timeKO": "16시 00분"
            },
            {
                "themePK": 41,
                "time": "17:40:00",
                "reservation": true,
                "timeKO": "17시 40분"
            },
            {
                "themePK": 41,
                "time": "19:20:00",
                "reservation": true,
                "timeKO": "19시 20분"
            },
            {
                "themePK": 41,
                "time": "21:00:00",
                "reservation": true,
                "timeKO": "21시 00분"
            }
        ],
        "31": [
            {
                "themePK": 31,
                "time": "11:00:00",
                "reservation": true,
                "timeKO": "11시 00분"
            },
            {
                "themePK": 31,
                "time": "12:30:00",
                "reservation": true,
                "timeKO": "12시 30분"
            },
            {
                "themePK": 31,
                "time": "14:00:00",
                "reservation": true,
                "timeKO": "14시 00분"
            },
            {
                "themePK": 31,
                "time": "15:30:00",
                "reservation": true,
                "timeKO": "15시 30분"
            },
            {
                "themePK": 31,
                "time": "17:00:00",
                "reservation": true,
                "timeKO": "17시 00분"
            },
            {
                "themePK": 31,
                "time": "18:30:00",
                "reservation": false,
                "timeKO": "18시 30분"
            },
            {
                "themePK": 31,
                "time": "20:00:00",
                "reservation": true,
                "timeKO": "20시 00분"
            },
            {
                "themePK": 31,
                "time": "21:30:00",
                "reservation": true,
                "timeKO": "21시 30분"
            }
        ],
        "29": [
            {
                "themePK": 29,
                "time": "11:10:00",
                "reservation": true,
                "timeKO": "11시 10분"
            },
            {
                "themePK": 29,
                "time": "12:25:00",
                "reservation": false,
                "timeKO": "12시 25분"
            },
            {
                "themePK": 29,
                "time": "13:40:00",
                "reservation": false,
                "timeKO": "13시 40분"
            },
            {
                "themePK": 29,
                "time": "14:55:00",
                "reservation": false,
                "timeKO": "14시 55분"
            },
            {
                "themePK": 29,
                "time": "16:10:00",
                "reservation": false,
                "timeKO": "16시 10분"
            },
            {
                "themePK": 29,
                "time": "17:25:00",
                "reservation": false,
                "timeKO": "17시 25분"
            },
            {
                "themePK": 29,
                "time": "18:40:00",
                "reservation": false,
                "timeKO": "18시 40분"
            },
            {
                "themePK": 29,
                "time": "19:55:00",
                "reservation": true,
                "timeKO": "19시 55분"
            },
            {
                "themePK": 29,
                "time": "21:10:00",
                "reservation": false,
                "timeKO": "21시 10분"
            }
        ],
        "37": [
            {
                "themePK": 37,
                "time": "11:20:00",
                "reservation": false,
                "timeKO": "11시 20분"
            },
            {
                "themePK": 37,
                "time": "12:35:00",
                "reservation": false,
                "timeKO": "12시 35분"
            },
            {
                "themePK": 37,
                "time": "13:50:00",
                "reservation": false,
                "timeKO": "13시 50분"
            },
            {
                "themePK": 37,
                "time": "15:05:00",
                "reservation": false,
                "timeKO": "15시 05분"
            },
            {
                "themePK": 37,
                "time": "16:20:00",
                "reservation": false,
                "timeKO": "16시 20분"
            },
            {
                "themePK": 37,
                "time": "17:35:00",
                "reservation": false,
                "timeKO": "17시 35분"
            },
            {
                "themePK": 37,
                "time": "18:50:00",
                "reservation": false,
                "timeKO": "18시 50분"
            },
            {
                "themePK": 37,
                "time": "20:05:00",
                "reservation": false,
                "timeKO": "20시 05분"
            },
            {
                "themePK": 37,
                "time": "21:20:00",
                "reservation": false,
                "timeKO": "21시 20분"
            }
        ]
    },
    "pricing": {
        "43": [
            {
                "themePK": 43,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 43,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 43,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 43,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 43,
                "people": 6,
                "price": "120,000"
            }
        ],
        "29": [
            {
                "themePK": 29,
                "people": 2,
                "price": "44,000"
            },
            {
                "themePK": 29,
                "people": 3,
                "price": "60,000"
            },
            {
                "themePK": 29,
                "people": 4,
                "price": "76,000"
            },
            {
                "themePK": 29,
                "people": 5,
                "price": "90,000"
            },
            {
                "themePK": 29,
                "people": 6,
                "price": "102,000"
            }
        ],
        "37": [
            {
                "themePK": 37,
                "people": 2,
                "price": "44,000"
            },
            {
                "themePK": 37,
                "people": 3,
                "price": "60,000"
            },
            {
                "themePK": 37,
                "people": 4,
                "price": "76,000"
            },
            {
                "themePK": 37,
                "people": 5,
                "price": "90,000"
            }
        ],
        "27": [
            {
                "themePK": 27,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 27,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 27,
                "people": 4,
                "price": "92,000"
            }
        ],
        "31": [
            {
                "themePK": 31,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 31,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 31,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 31,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 31,
                "people": 6,
                "price": "120,000"
            }
        ],
        "25": [
            {
                "themePK": 25,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 25,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 25,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 25,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 25,
                "people": 6,
                "price": "120,000"
            }
        ],
        "41": [
            {
                "themePK": 41,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 41,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 41,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 41,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 41,
                "people": 6,
                "price": "120,000"
            }
        ],
        "45": [
            {
                "themePK": 45,
                "people": 2,
                "price": "54,000"
            },
            {
                "themePK": 45,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 45,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 45,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 45,
                "people": 6,
                "price": "120,000"
            }
        ],
        "23": [
            {
                "themePK": 23,
                "people": 3,
                "price": "75,000"
            },
            {
                "themePK": 23,
                "people": 4,
                "price": "92,000"
            },
            {
                "themePK": 23,
                "people": 5,
                "price": "110,000"
            },
            {
                "themePK": 23,
                "people": 6,
                "price": "120,000"
            }
        ]
    }
};

let componentRef = useRef(null);

  return (
    <Grid
    sx={{height:'90vh'}}
    container
    direction="column"
    alignItems="center"
    justifyContent="space-evenly"
    >
        <Typography
        variant="h5"
        >예약 가능한 테마</Typography>
        <Grid
        container 
        spacing={2}
        justifyContent="space-around"

        sx={{ height:'80vh', overflow:'scroll', '&::-webkit-scrollbar': {display: "none"}
    }}
        >
            {data.data.map((data, index) => (
                <Grid item xs={10} sm={6} md={4} lg={3} key={index}
                justifyContent="space-around"
                container 
                
                >
                    <ReserveCard
                    //  printRef={componentRef}
                    data={data}/>
                </Grid>
            ))}
        </Grid>
    </Grid>
    
    
    )
      
      // beforePopState() : 라우터가 작동하기 전에 무언가를 해야할 때 사용
      // routeChangeStart() : 경로가 변경되기 시작할 때 발생
      // routeChangeComplete() : 경로가 완전히 변경되면 발생
      // routeChangeError() : 경로 변경 시 오류가 발생하거나 경로 로드가 취소되면 발생
      // beforeHistoryChange() : 브라우저의 기록을 변경하기 전에 실행
      // hashChangeStart() : 해시는 변경되지만 페이지는 변경되지 않을 때 발생
      // hashChangeComplete : 해시가 변경되었지만 페이지가 변경되지 않은 경우 발생
}