import { View, Text, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

const Team = ({ navigation }) => {
  const colors = [
    '#fff','#F9E79F','#85C1E9','#F8C471','#F5B7B1','#A9DFBF','#48C9B0',
  ];
  const dsnhom = [
    { id: '1', tentv: 'VÕ VĂN HUỆ', mssv: 'B2100126', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
    { id: '2', tentv: 'NGUYỄN TRƯỜNG GIANG', mssv: 'B2106567', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
    { id: '3', tentv: 'NGUYỄN TIẾN THÀNH', mssv: 'B2106596', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
    { id: '4', tentv: 'NGUYỄN QUÝ HƯNG', mssv: 'B2113188', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
    { id: '5', tentv: 'VÕ THANH SANG', mssv: 'B2113201', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
    { id: '6', tentv: 'BÙI THỊ HUỲNH NHƯ', mssv: 'B2113197', truong: 'Trường Bách Khoa', khoa: 'Kỹ Thuật Điều Khiển Và Tự Động Hóa', khoas: 'K47' },
  ];

  function headertable() {
    return (
      <View style={{
        flexDirection: 'row',
        marginBottom:10,
      }}>
        <Text style={{
          flex: 2,
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: '700'
        }}>STT</Text>
        <Text style={{
          flex: 8,
          color: 'black',
          fontSize: 16,
          fontWeight: '700'
        }}>TÊN</Text>
        <Text style={{
          flex: 4,
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: '700'
        }}>MSSV</Text>
      </View>
    )
  }
  function nhom02({ item }) {
    return (
      <View>
      <TouchableOpacity  style={{
        flexDirection: 'row',
        marginBottom:5,
        height:30,
        alignItems:'center',
        borderRadius:5,
        backgroundColor: colors[item.id]
      }}
      onPress={() => {
        Alert.alert('THÔNG TIN SINH VIÊN:',
        `\nTÊN:${item.tentv}\n\nMSSV:${item.mssv}\n\nKHÓA:${item.khoas}\n\nTRƯỜNG:${item.truong}\n\nKHOA:${item.khoa}
        `,
        [
          {text:'CLOSE',onPress: () => {}}
        ]
        )
      }}
      >
        <Text style={{
          flex: 2,
          color: 'black',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '500',
        }}>{item.id}</Text>
        <Text style={{
          flex: 9,
          color: 'black',
          fontSize: 16,
          fontWeight: '500',
        }}>{item.tentv}</Text>
        <Text style={{
          flex: 4,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '500',
          color: 'black'
        }}>{item.mssv}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  const date = new Date();
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#afe0ef',
      alignItems: 'center'
    }}>
      <Text
        style={{
          color: "#000000",
          fontSize: 23,
          textAlign: "center",
          marginBottom: 50,
          fontWeight:'600',
          textDecorationLine:'underline'
        }}>
        {"TRƯỜNG ĐẠI HỌC CẦN THƠ \nTRƯỜNG BÁCH KHOA"}
      </Text>
      {/*  */}
      <ImageBackground
        source={require('../../../assets/0305-logo-ctu.png')}
        style={{
          width: 300,
          height: 300,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        imageStyle={{ opacity: 0.3 }}
      >
        <Text style={{
          color: '#0f066c',
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>{" BÁO CÁO ĐỒ ÁN KC225-LẬP TRÌNH ĐIỀU KHIỂN TRÊN \n THIẾT BỊ DI ĐỘNG"}</Text>
        {/*  */}
        <Text
          style={{
            color: "#000000",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center'
          }}>
          {"Đề Tài : Hệ Thống Chăm Sóc Mặt Sân Cỏ Bóng Đá"}
        </Text>
        <Text
          style={{
            color: "#000000",
            fontSize: 20,
            fontWeight: "bold",
          }}>
          {"GVHD: Ts.Nguyễn Văn Khanh"}
        </Text>
        {/*  */}
        <Text
          style={{
            color: "#000000",
            fontSize: 18,
            fontWeight: "bold",
          }}>
          {"Nhóm 2_CT7_301/C1"}
        </Text>
      </ImageBackground>
      <FlatList
        style={{
          width: '85%',
        }}
        data={dsnhom}
        ListHeaderComponent={headertable}
        renderItem={nhom02}
        keyExtractor={(item) => item.id}
      />

      <Text
        style={{
          position: 'absolute',
          bottom: 20,
          color: "gray",
          fontSize: 20,
        }}>
        Cần Thơ, ngày {date.getDate()} tháng {date.getMonth()+1} năm {date.getFullYear()}
      </Text>
    </View>
  )
}

export default Team;