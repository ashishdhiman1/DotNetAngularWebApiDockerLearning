using clientApi.Data;
using clientApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace clientApi.Controllers
{
    [Route("api/Employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_context.Employees.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetEmployeeById(int id) {
            var employee = _context.Employees.Find(id);
            if(employee is null)
            {
                return NotFound();
            }
            return Ok(employee);    
        }
        [HttpPost]
        public IActionResult AddEmployee(EmployeeDto employee)
        {
            var employeeData = new Employee()
            {
                EmployeeName = employee.EmployeeName,
                Email=employee.Email,
                Phone=employee.Phone,
                Salary=employee.Salary
            };
            _context.Employees.Add(employeeData);
            _context.SaveChanges();
            return Ok(employeeData);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateEmployee(int id,EmployeeDto employeeData)
        {
            var employee = _context.Employees.Find(id);
            if (employee is null)
            {
                return NotFound();
            }
            employee.EmployeeName=employeeData.EmployeeName;
            employee.Email=employeeData.Email;
            employee.Phone=employeeData.Phone;
            employee.Salary=employeeData.Salary;
            _context.SaveChanges();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee is null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return Ok();
        }
    }
}
