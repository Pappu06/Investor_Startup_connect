import { useEffect, useState } from "react";
import { Card, Button, Modal, Input, Row, Col, message } from "antd";
import API from "../services/api";
import AppLayout from "../components/AppLayout";

const { TextArea } = Input;

export default function InvestorDashboard() {
  const [startups, setStartups] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [interestMessage, setInterestMessage] = useState("");

  useEffect(() => {
    API.get("/startups")
      .then((res) => setStartups(res.data))
      .catch(() => message.error("Failed to load startups"));
  }, []);

  const openModal = (startup) => {
    setSelectedStartup(startup);
    setOpen(true);
  };

  const sendInterest = async () => {
    try {
      await API.post("/interests", {
        startupId: selectedStartup._id,
        message: interestMessage
      });

      message.success("Interest sent successfully 🎉");
      setOpen(false);
      setInterestMessage("");
    } catch (err) {
      message.error(
        err.response?.data?.message || "Error sending interest"
      );
    }
  };

  return (
    <AppLayout>
        <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "20px" }}>🚀 Available Startups</h2>

      <Row gutter={[16, 16]}>
        {startups.map((startup) => (
          <Col xs={24} sm={12} md={8} key={startup._id}>
            <Card
              title={startup.title}
              bordered
              hoverable
              actions={[
                <Button
                  type="primary"
                  onClick={() => openModal(startup)}
                >
                  Interested
                </Button>
              ]}
            >
              <p><b>Category:</b> {startup.category}</p>
              <p><b>Funding:</b> ₹{startup.fundingRequired}</p>
              <p><b>Equity:</b> {startup.equityOffer}%</p>
              <p><b>Founder:</b> {startup.owner.name}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL */}
      <Modal
        title={`Interest in ${selectedStartup?.title}`}
        open={open}
        onOk={sendInterest}
        onCancel={() => setOpen(false)}
        okText="Send Interest"
      >
        <TextArea
          rows={4}
          placeholder="Write a short message to the founder"
          value={interestMessage}
          onChange={(e) => setInterestMessage(e.target.value)}
        />
      </Modal>
    </div>
    </AppLayout>
  );
}
