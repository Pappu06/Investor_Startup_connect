import { Card, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await API.post("/auth/login", values);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      message.success("Login successful 🎉");

      navigate(
        res.data.user.role === "business" ? "/business" : "/investor"
      );
    } catch (err) {
      message.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <AppLayout>
        <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3} style={{ textAlign: "center" }}>
          Login to Bridge 🌉
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <p style={{ marginTop: 16, textAlign: "center" }}>
            Don’t have an account?{" "}
            <a href="/register">Register</a>
          </p>
        </Form>
      </Card>
    </div>
    </AppLayout>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  },
  card: {
    width: 350
  }
};
