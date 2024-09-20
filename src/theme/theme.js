import { createTheme } from '@mui/material/styles';
//الهدف هو تخصيص الألوان والأنماط لعناصر الواجهة على التطبيق. كله

const primary = "#18E1D9";
const secondary = "#0B0B15";

export default createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: { //  كل مكون (مثل الأزرار، النوافذ، القوائم) يأتي مع تصميم جاهز ومحدد مسبقًا. أحيانًا قد تحتاجين إلى تغيير هذا التصميم ليبدو بالشكل الذي تريدينه. هنا يأتي دور .
        root: {
          padding: "8px 24px 16px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          color: secondary,
          padding: "6px 24px",
        },
        outlined: { // في حالة outlined
          borderRadius: "35px",
          borderColor: secondary,
          padding: "6px 20px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        filled: {
          padding: "15px 0 15px 15px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          height: "49px",
          padding: "0px 0 0 10px",
        },
      },
    },
  },
});
