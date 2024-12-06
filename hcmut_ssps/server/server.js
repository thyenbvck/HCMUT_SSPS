const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000"
  }));
const filePath = "../src/hcmut_ssps_complex_data.json";
/*API ADMIN */
/********************************/
/********************************/
/*ManagePrinter*/
app.get("/admin/printer-management", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      res.send(JSON.parse(data).printers);
    }
  });
});
app.post("/admin/printer-management", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      const printers = JSON.parse(data);
      printers.printers.push(req.body);
      fs.writeFile(filePath, JSON.stringify(printers, null, 2), (err) => {
        if (err) {
          res.status(500).send({ message: "Error writing to JSON file" });
        } else {
          res.send({ message: "Printer added successfully" });
        }
      });
    }
  });
});
app.put("/admin/printer-management/:id", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      const printers = JSON.parse(data);
      const index = printers.printers.findIndex(
        (printer) => printer.printer_id === req.params.id
      );
      if (index !== -1) {
        printers.printers[index] = req.body;
        fs.writeFile(filePath, JSON.stringify(printers, null, 2), (err) => {
          if (err) {
            res.status(500).send({ message: "Error writing to JSON file" });
          } else {
            res.send({ message: "Printer updated successfully" });
          }
        });
      } else {
        res.status(404).send({ message: "Printer not found" });
      }
    }
  });
});
app.delete("/admin/printer-management/:id", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      const printers = JSON.parse(data);
      printers.printers = printers.printers.filter(
        (printer) => printer.printer_id !== req.params.id
      );
      fs.writeFile(filePath, JSON.stringify(printers, null, 2), (err) => {
        if (err) {
          res.status(500).send({ message: "Error writing to JSON file" });
        } else {
          res.send({ message: "Printer deleted successfully" });
        }
      });
    }
  });
});
/*ManageAccount*/
app.get("/admin/account-management", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const accounts = JSON.parse(data).accounts;
        res.send(accounts);
      }
    });
  });
  app.post("/admin/account-management", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        const accounts = fileData.accounts;
  
        accounts.push(req.body);
        fileData.accounts = accounts;
  
        fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
          if (err) {
            res.status(500).send({ message: "Error writing to JSON file" });
          } else {
            res.send({ message: "Account added successfully" });
          }
        });
      }
    });
  });
  app.put("/admin/account-management/:student_id", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        const accounts = fileData.accounts;
  
        const index = accounts.findIndex(
          (account) => account.student_id === req.params.student_id
        );
  
        if (index !== -1) {
          accounts[index] = { ...accounts[index], ...req.body };
          fileData.accounts = accounts;
  
          fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
            if (err) {
              res.status(500).send({ message: "Error writing to JSON file" });
            } else {
              res.send({ message: "Account updated successfully" });
            }
          });
        } else {
          res.status(404).send({ message: "Account not found" });
        }
      }
    });
  });
  app.delete("/admin/account-management/:student_id", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        const accounts = fileData.accounts.filter(
          (account) => account.student_id !== req.params.student_id
        );
  
        fileData.accounts = accounts;
  
        fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
          if (err) {
            res.status(500).send({ message: "Error writing to JSON file" });
          } else {
            res.send({ message: "Account deleted successfully" });
          }
        });
      }
    });
  });
  app.get("/admin/configuration-management", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        const configResponse = {
          ...fileData.config
        };
        res.send(configResponse);
      }
    });
  });  
  app.put("/admin/configuration-management", (req, res) => {
    const { allowedFormats, allowedPaperSizes, supplyDate } = req.body.current;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        fileData.config.current.allowedFormats = allowedFormats || fileData.config.current.allowedFormats;
        fileData.config.current.allowedPaperSizes = allowedPaperSizes || fileData.config.current.allowedPaperSizes;
        fileData.config.current.supplyDate = supplyDate || fileData.config.current.supplyDate;
  
        fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
          if (err) {
            res.status(500).send({ message: "Error writing to JSON file" });
          } else {
            res.send({ message: "Configuration updated successfully", config: fileData.config });
          }
        });
      }
    });
  });
/*API STUDENT */
/********************************/
app.get('/student/user/:id', (req, res) => {
  const studentId = req.params.id;
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Error reading data file.' });
    }
    const fileData = JSON.parse(data); 
    const users = fileData.accounts;

    const user = users.find(user => user.student_id === studentId);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send({ message: 'User not found.' });
    }
  });
});
app.post("/student/user/updatePageCount", (req, res) => {
  const { student_id, available_pages, totalPages } = req.body;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Lỗi khi đọc dữ liệu người dùng." });
    }
    const filedata = JSON.parse(data);
    const users = filedata.accounts;
    const userIndex = users.findIndex(user => user.student_id === student_id);
    
    if (userIndex === -1) {
      return res.status(404).send({ message: "Không tìm thấy người dùng." });
    }
    users[userIndex].available_pages = available_pages;
    users[userIndex].totalPages = totalPages;
    filedata.accounts = users;
    fs.writeFile(filePath, JSON.stringify(filedata, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).send({ message: "Lỗi khi lưu dữ liệu người dùng." });
      }
      return res.status(200).send({ message: "Cập nhật thông tin người dùng thành công." });
    });
  });
});

/********************************/
app.get("/student/print-selection", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      const fileData = JSON.parse(data);
      const printers = fileData.printers.filter((printer) => printer.status === "Ready");
      const allowedPaperSizes = fileData.config.current.allowedPaperSizes || 0;
      res.send({
        printers,
        allowedPaperSizes,
      });
    }
  });
});
app.post("/student/print-history", (req, res) => {
  const printHistory = req.body; 
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error reading JSON file" });
    } else {
      fileData = JSON.parse(data);
      const history = fileData.PrintHistory;
      history.push(printHistory);
      fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (writeError) => {
        if (writeError) {
          res.status(500).send({ message: "Error saving print history" });
        } else {
          res.send({ message: "Print history saved successfully" });
        }
      });
    } 
})
  });
  app.get("/student/print-history/:student_id", (req, res) => {
    const { student_id } = req.params;
  
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).send({ message: "Error reading JSON file" });
      }
      const fileData = JSON.parse(data);
      const printHistory = fileData.PrintHistory.filter(item => item.student_id === student_id);
      if (printHistory.length === 0) {
        return res.status(200).send({ message: "No print history found", printHistory: [] });
      }
      console.log("history",printHistory);
      res.status(200).send({ printHistory });
    });
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
