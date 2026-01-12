import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Typography,
  message
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await API.post("/auth/register", values);
      message.success("Registered successfully 🎉");
      navigate("/login");
    } catch (err) {
      message.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
   <AppLayout>
     <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3} style={{ textAlign: "center" }}>
          Create Account 🚀
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name required" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Select role" }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="business">
                Business
              </Select.Option>
              <Select.Option value="investor">
                Investor
              </Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <p style={{ marginTop: 16, textAlign: "center" }}>
            Already have an account?{" "}
            <a href="/login">Login</a>
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
    width: 380
  }
};
