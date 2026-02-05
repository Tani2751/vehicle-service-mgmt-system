import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Img,
  Link,
} from "@react-email/components";
import React from "react";

export default  function PasswordResetEmail({ username, resetLink }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={containerStyle}>

          {/* Logo */}
          <Container style={logoContainer}>
            <Img
              src="https://res.cloudinary.com/duxgfwaef/image/upload/v1768487752/logo-LD_oq8nv0.png"
              width="130"
              alt="MotoCare Logo"
              style={logoImage}
            />
          </Container>

          <Heading style={heading}>
            Set your password
          </Heading>

          
            <Img
              src="https://res.cloudinary.com/duxgfwaef/image/upload/v1768392914/man_extending_hand_from_browser_window_fzuf3s.jpg"
              width="170"
              alt="MotoCare Logo"
              style={greetingImg}
            />
          

          <Text style={text}>
            Hi {username || "there"},
          </Text>

          <Text style={text}>
            An account has been created for you.
            Click the button below to set your password.
          </Text>

          <Button href={resetLink} style={button}>
            Set your password
          </Button>

          <Text style={small}>
            This link expires in 24 hours.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footerText}>
            © {new Date().getFullYear()} MotoCare. All rights reserved.
          </Text>

          <Text style={footerText}>
            Telecom Nagar, Sevagram Road, Wardha, Maharashtra, India
          </Text>

          <Text style={footerText}>
            Need help?{" "}
            <Link
              href="mailto:support@motocare.com"
              style={link}
            >
              support@motocare.com
            </Link>
          </Text>

        </Container>
      </Body>
    </Html>
  
  );
}



const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
};

const logoContainer = {
  textAlign: "center",
  paddingBottom: "20px",
};

const logoImage = {
  display: "block",
  margin: "0 auto",
};

const heading = {
  fontSize: "22px",
  color: "#1a1a1a", // dark-mode safe text
};

const text = {
  fontSize: "14px",
  color: "#1a1a1a",
};

const small = {
  fontSize: "12px",
  color: "#6b7280", // neutral gray (won’t invert badly)
};

const button = {
  backgroundColor: "#111827", // not pure black
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "6px",
  textDecoration: "none",
};

const hr = {
  margin: "24px 0 16px",
  borderColor: "#e5e7eb", // stable divider color
};

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  lineHeight: "18px",
  textAlign: "center",
};

const link = {
  color: "#2563eb", // blue that survives inversion
  textDecoration: "underline",
};


const greetingImg = {
  margin: "20px"
}
