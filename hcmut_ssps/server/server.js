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
  
  // API: Thêm tài khoản
  app.post("/admin/account-management", (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error reading JSON file" });
      } else {
        const fileData = JSON.parse(data);
        const accounts = fileData.accounts;
  
        accounts.push(req.body); // Thêm tài khoản mới
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
  
  // API: Sửa tài khoản
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
          accounts[index] = { ...accounts[index], ...req.body }; // Cập nhật tài khoản
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
  
  // API: Xóa tài khoản
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
